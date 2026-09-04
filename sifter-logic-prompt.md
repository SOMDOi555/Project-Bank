# Sifter Logic Prompt

ต้องการปรับปรุง Logic การคำนวณในไฟล์:

`src/pages/sifter.vue`

โดยหน้า `sifter.vue` จะรับค่าจาก Component:

`src/components/AnalysisForm.vue`

และนำค่าที่ผู้ใช้กรอกมาคำนวณเพื่อแสดงผลการวิเคราะห์ **Bulk Density และ Control Sifter**

---

## 1. รับค่าจาก `AnalysisForm.vue`

ให้ตรวจสอบโครงสร้างข้อมูลที่ `AnalysisForm.vue` ส่งมายัง `sifter.vue` ก่อน โดยไม่เปลี่ยนชื่อ field หรือโครงสร้างข้อมูลเดิมโดยไม่จำเป็น

ค่าที่ต้องนำมาใช้หลัก ๆ ได้แก่:

- น้ำหนัก (Weight)
- ปริมาตร (Volume)
- `Circulate`
- `Pressure control`

---

## 2. คำนวณ Bulk Density

ให้นำค่า **น้ำหนัก** และ **ปริมาตร** มาคำนวณตามสูตร:

```text
Bulk Density = (น้ำหนัก / ปริมาตร) × 1000
```

ตัวอย่าง:

```text
น้ำหนัก = 0.4698
ปริมาตร = 10

Bulk Density = (0.4698 / 10) × 1000
             = 46.98
```

ให้เก็บค่า Bulk Density ที่คำนวณได้เพื่อนำไปใช้ตรวจสอบเกณฑ์ต่อไป

ควรแสดงค่า Bulk Density ให้เหมาะสม เช่น ทศนิยม 2 ตำแหน่ง

---

## 3. ตรวจสอบเกณฑ์ Bulk Density

แบ่งเกณฑ์ออกเป็น 2 กรณีหลัก

### กรณีที่ 1: อยู่ในเกณฑ์ปกติ

ถ้าค่า Bulk Density อยู่ในช่วง:

```text
39.00 - 43.00
```

ให้ถือว่า:

```text
Bulk Density = ปกติ
```

กรณีนี้ **ไม่ต้องคำนวณ Control Sifter**

### กรณีที่ 2: อยู่ในเกณฑ์ผิดปกติ

ถ้าค่า Bulk Density อยู่ในช่วง:

```text
43.01 - 52.00
```

ให้ถือว่า:

```text
Bulk Density = ผิดปกติ
```

และต้องดำเนินการคำนวณ **Control Sifter** ต่อ

> หมายเหตุ: Input ถูกกำหนดช่วงค่ามาแล้ว ดังนั้นค่าที่คำนวณได้จะอยู่ภายในช่วงที่กำหนด ไม่จำเป็นต้องสร้างกรณีพิเศษสำหรับค่าที่ต่ำกว่า 39.00 หรือสูงกว่า 52.00

---

## 4. แบ่งกลุ่มค่า Circulate

ค่า `Circulate` ให้แบ่งออกเป็น 3 กลุ่มดังนี้:

```text
Group 1 = 55 - 57
Group 2 = 58 - 61
Group 3 = 62 - 65
```

Mapping:

```text
55–57 → Group 1
58–61 → Group 2
62–65 → Group 3
```

---

## 5. แบ่งกลุ่มค่า Pressure Control

ค่า `Pressure control` ให้แบ่งออกเป็น 3 กลุ่มดังนี้:

```text
A = 10.0 - 13.9
B = 14.0 - 17.9
C = 18.0 - 20.0
```

Mapping:

```text
10.0–13.9 → A
14.0–17.9 → B
18.0–20.0 → C
```

---

## 6. สร้าง Combination จาก Circulate + Pressure Control

ให้นำ Group ของ `Circulate` มาจับคู่กับ Group ของ `Pressure control`

ตัวอย่าง:

```text
Circulate = 63
Pressure control = 13.1
```

จะได้:

```text
Circulate 63 → Group 3
Pressure control 13.1 → A

Combination = 3A
```

Combination นี้คือ **Current Combination** ของค่าที่ผู้ใช้กรอก

---

## 7. กำหนดลำดับ Combination ตามค่า Reject

ให้กำหนดลำดับ Combination แบบตายตัวตามเกณฑ์ **Reject น้อย → Reject มาก**

ลำดับต้องเป็นดังนี้:

```text
อันดับ 1 → 3A
อันดับ 2 → 3B
อันดับ 3 → 2A
อันดับ 4 → 2B
อันดับ 5 → 3C
อันดับ 6 → 1A
อันดับ 7 → 2C
อันดับ 8 → 1B
อันดับ 9 → 1C
```

ให้สร้างเป็น Constant หรือ Array กลาง เช่น:

```js
const sifterCombinations = [
  '3A',
  '3B',
  '2A',
  '2B',
  '3C',
  '1A',
  '2C',
  '1B',
  '1C'
]
```

**ห้ามเรียง Combination ตามตัวเลขหรือเรียงตัวอักษรเอง** เพราะลำดับนี้เป็น Business Logic ที่กำหนดไว้โดยเฉพาะ

---

## 8. หา Current Combination ของผู้ใช้

เมื่อได้ค่า `Circulate` และ `Pressure control` แล้ว ให้แปลงค่าทั้งสองเป็น Group ก่อน จากนั้นนำมารวมกันเป็น Combination

ตัวอย่าง:

```text
Circulate = 63
Pressure control = 13.1

63 → Group 3
13.1 → A

Current Combination = 3A
```

จากนั้นหา Position หรือ Index ของ Combination นี้ใน Array `sifterCombinations` เพื่อใช้คำนวณ Control Sifter

---

## 9. กำหนดจำนวน Combination ที่ต้องลดตาม Bulk Density

เฉพาะกรณี Bulk Density อยู่ในช่วงผิดปกติ `43.01 - 52.00` ให้แบ่งเป็น 3 ช่วงดังนี้:

### ช่วงที่ 1

```text
43.01 - 44.99
```

ให้:

```text
ลด Combination ลง 1 คู่
```

### ช่วงที่ 2

```text
45.00 - 47.99
```

ให้:

```text
ลด Combination ลง 2 คู่
```

### ช่วงที่ 3

```text
48.00 - 52.00
```

ให้:

```text
ลด Combination ลง 3 คู่
```

สามารถสร้าง Logic เช่น:

```text
43.01–44.99 → reduction = 1
45.00–47.99 → reduction = 2
48.00–52.00 → reduction = 3
```

---

## 10. ความหมายของ “ลด Combination ลง X คู่”

**สำคัญมาก**

คำว่า **ลด Combination ลง X คู่** ในระบบนี้ ไม่ได้หมายถึงการเลื่อน Index ลงเพียง X ตำแหน่ง

Logic ที่ถูกต้องคือ:

1. เริ่มจาก Current Combination
2. ไม่นับ Current Combination เป็นคู่ที่ลด
3. ข้าม Combination ถัดไปตามจำนวน `X`
4. เลือก Combination ถัดจากคู่สุดท้ายที่ถูกข้ามมาเป็น **Recommended Control Sifter**

กล่าวคือ:

```text
recommendedIndex = currentIndex + reduction + 1
```

โดยต้องตรวจสอบขอบเขตของ Array ให้เหมาะสมกับข้อมูลที่กำหนดไว้

### ตัวอย่าง: ลด 1 คู่

Current Combination:

```text
3A
```

ลำดับ:

```text
3A → 3B
```

ผล:

```text
Recommended Control Sifter = 3B
```

### ตัวอย่าง: ลด 2 คู่

Current Combination:

```text
3A
```

ลำดับ:

```text
3A → 3B → 2A → 2B
```

ข้าม:

```text
3B ← คู่ที่ 1
2A ← คู่ที่ 2
```

ดังนั้นผลลัพธ์คือ:

```text
Recommended Control Sifter = 2B
```

### ตัวอย่าง: ลด 3 คู่

Current Combination:

```text
3A
```

ลำดับ:

```text
3A → 3B → 2A → 2B → 3C
```

ข้าม:

```text
3B ← คู่ที่ 1
2A ← คู่ที่ 2
2B ← คู่ที่ 3
```

ดังนั้นผลลัพธ์คือ:

```text
Recommended Control Sifter = 3C
```

---

## 11. ตัวอย่างการทำงานเต็มรูปแบบ

ผู้ใช้กรอก:

```text
Circulate = 63
Pressure control = 13.1
```

ระบบแปลงค่าเป็น:

```text
Circulate 63 → Group 3
Pressure control 13.1 → Group A

Current Combination = 3A
```

สมมติคำนวณ Bulk Density ได้:

```text
Bulk Density = 46.98
```

ตรวจสอบช่วง:

```text
46.98 อยู่ในช่วง 45.00–47.99
```

ดังนั้น:

```text
ต้องลด Combination ลง 2 คู่
```

เริ่มจาก:

```text
3A
```

ข้าม 2 Combination:

```text
3B ← คู่ที่ 1
2A ← คู่ที่ 2
```

Combination ถัดไปคือ:

```text
2B
```

ดังนั้นผลลัพธ์สุดท้ายคือ:

```text
Bulk Density: 46.98
สถานะ: ผิดปกติ

Current Sifter: 3A
Recommended Control Sifter: 2B
```

---

## 12. ตัวอย่างเพิ่มเติม

### Example 1

```text
Current Combination = 3A
Bulk Density = 44.50
```

Bulk Density อยู่ในช่วง:

```text
43.01–44.99
```

ต้องลด 1 คู่:

```text
3A → 3B
```

ผล:

```text
Recommended Control Sifter = 3B
```

### Example 2

```text
Current Combination = 3A
Bulk Density = 46.98
```

อยู่ในช่วง:

```text
45.00–47.99
```

ต้องลด 2 คู่:

```text
3A
↓
3B ← ข้าม 1
↓
2A ← ข้าม 2
↓
2B ← ผลลัพธ์
```

ผล:

```text
Recommended Control Sifter = 2B
```

### Example 3

```text
Current Combination = 3A
Bulk Density = 50.13
```

อยู่ในช่วง:

```text
48.00–52.00
```

ต้องลด 3 คู่:

```text
3A
↓
3B ← ข้าม 1
↓
2A ← ข้าม 2
↓
2B ← ข้าม 3
↓
3C ← ผลลัพธ์
```

ผล:

```text
Recommended Control Sifter = 3C
```

---

## 13. กรณี Bulk Density ปกติ

ถ้า:

```text
Bulk Density = 39.00–43.00
```

ให้แสดงผล:

```text
Bulk Density: XX.XX
สถานะ: ปกติ
```

และ **ไม่ต้องแสดง Recommended Control Sifter**

---

## 14. แนวทางการ Implement

ควรแยก Logic ออกเป็น Function หรือ Computed Property ที่ชัดเจน เช่น:

- `calculateBulkDensity()`
- `getCirculateGroup()`
- `getPressureGroup()`
- `getCurrentCombination()`
- `getReductionLevel()`
- `getRecommendedControlSifter()`

ชื่อ Function สามารถปรับให้เข้ากับรูปแบบของโปรเจกต์เดิมได้

ตัวอย่าง Flow:

```text
AnalysisForm.vue
      ↓
รับ Weight / Volume / Circulate / Pressure control
      ↓
คำนวณ Bulk Density
      ↓
ตรวจสอบช่วง Bulk Density
      │
      ├── 39.00–43.00
      │       ↓
      │     ปกติ
      │       ↓
      │      จบ
      │
      └── 43.01–52.00
              ↓
           ผิดปกติ
              ↓
      แปลง Circulate เป็น Group 1/2/3
              ↓
      แปลง Pressure control เป็น A/B/C
              ↓
      หา Current Combination
              ↓
      ตรวจช่วง Bulk Density
              ↓
      กำหนด reduction = 1 / 2 / 3
              ↓
      ใช้ลำดับ Reject:
      3A → 3B → 2A → 2B → 3C → 1A → 2C → 1B → 1C
              ↓
      ข้าม Combination ตามจำนวน reduction
              ↓
      เลือก Combination ถัดไป
              ↓
      ได้ Recommended Control Sifter
              ↓
      แสดงผลบน sifter.vue
```

---

## 15. ข้อกำหนดสำคัญ

- อย่า Hard-code ผลลัพธ์เฉพาะตัวอย่าง เช่น `3A → 2B`
- ต้องคำนวณจากค่าที่ผู้ใช้กรอกจริงทุกครั้ง
- ต้องใช้ลำดับ Reject ที่กำหนดไว้เท่านั้น
- Current Combination ไม่นับรวมในจำนวนคู่ที่ต้องลด
- สูตร Bulk Density ต้องเป็น:

```text
(น้ำหนัก / ปริมาตร) × 1000
```

- แสดง Bulk Density อย่างน้อย 2 ตำแหน่งทศนิยม
- ไม่ต้องสร้างกรณีแสดงผลสำหรับ Bulk Density ที่ต่ำกว่า 39.00 หรือสูงกว่า 52.00 เนื่องจาก Input ถูกจำกัดช่วงค่าไว้แล้ว
- ควรแยก Business Logic ออกจากส่วน UI เพื่อให้แก้ไขและดูแลต่อได้ง่าย
- ไม่ควรแก้ไข `AnalysisForm.vue` ถ้าไม่จำเป็น
- ต้องใช้ข้อมูลจริงที่ `AnalysisForm.vue` ส่งมา ห้ามสร้าง Mock Data แทน
- ก่อนแก้ไข ให้ตรวจสอบโค้ดปัจจุบันของทั้ง `src/pages/sifter.vue` และ `src/components/AnalysisForm.vue`
- อย่าลบ Functionality เดิมที่ไม่เกี่ยวข้องกับ Logic นี้

---

## เป้าหมายสุดท้าย

ต้องการให้ `src/pages/sifter.vue` สามารถรับข้อมูลจาก `src/components/AnalysisForm.vue` แล้วคำนวณและแสดงผลได้ตาม Business Logic ดังนี้:

```text
1. รับ Weight และ Volume
2. คำนวณ Bulk Density = (Weight / Volume) × 1000
3. ถ้า Bulk Density อยู่ในช่วง 39.00–43.00 → ปกติ → จบ
4. ถ้า Bulk Density อยู่ในช่วง 43.01–52.00 → ผิดปกติ
5. แปลง Circulate เป็น Group 1/2/3
6. แปลง Pressure control เป็น Group A/B/C
7. รวมเป็น Current Combination
8. ตรวจสอบช่วง Bulk Density เพื่อกำหนด reduction 1/2/3
9. ใช้ลำดับ Combination ตาม Reject น้อย → มาก:
   3A → 3B → 2A → 2B → 3C → 1A → 2C → 1B → 1C
10. ข้าม Combination ตามจำนวน reduction โดยไม่นับ Current Combination
11. เลือก Combination ถัดไปเป็น Recommended Control Sifter
12. แสดง Bulk Density, สถานะ และ Recommended Control Sifter บนหน้า sifter.vue
```
