## ผลการทดสอบ Constraint

### 1. FOREIGN KEY

**คำสั่งที่ลอง**

```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-TEST' , 88888 , 'แจ้งซ่อม' , 'ห้องทดสอบ' , 'ทดสอบระบบ');
```

**ผลที่ได้**

```text
FOREIGN KEY constraint failed
```

ถูกปฏิเสธเนื่องจาก `requester_id` หมายเลข `88888` ไม่มีอยู่ในตาราง `users` จึงไม่สามารถสร้างคำร้องที่อ้างอิงผู้ใช้งานที่ไม่มีอยู่จริงได้

---

### 2. CHECK

**คำสั่งที่ลอง**

```sql
UPDATE requests
SET status = 'cancelled'
WHERE id = 'REQ-002';
```

**ผลที่ได้**

```text
CHECK constraint failed: status
```

ถูกปฏิเสธเนื่องจากค่า `cancelled` ไม่อยู่ในค่าที่กำหนดไว้ใน `CHECK` ของคอลัมน์ `status` ซึ่งอนุญาตเฉพาะ `pending`, `in-progress` และ `completed`

---

### 3. UNIQUE (ใส่อีเมลซ้ำ)

**คำสั่งที่ลอง**

```sql
INSERT INTO users (name, department, email)
VALUES ('ธนกฤต ตั้งใจ', 'วิศวกรรมไฟฟ้า', 'thanakrit@rmutl.ac.th');
```

**ผลที่ได้**

```text
UNIQUE constraint failed: users.email
```

ถูกปฏิเสธเนื่องจากอีเมล `thanakrit@rmutl.ac.th` มีอยู่ในตาราง `users` แล้ว จึงไม่สามารถเพิ่มผู้ใช้งานที่มีอีเมลซ้ำกันได้

---

### 4. UNIQUE (ใส่ ID คำร้องซ้ำ)

**คำสั่งที่ลอง**

```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-003', 3, 'ขอใช้อุปกรณ์', 'ห้องประชุม 2', 'ขอยืมโปรเจกเตอร์');
```

**ผลที่ได้**

```text
UNIQUE constraint failed: requests.id
```

ถูกปฏิเสธเนื่องจาก `REQ-003` มีอยู่ในตาราง `requests` แล้ว และคอลัมน์ `id` ถูกกำหนดให้เป็น `PRIMARY KEY` จึงไม่สามารถใช้ ID คำร้องซ้ำกันได้

---

### 5. NOT NULL

**คำสั่งที่ลอง**

```sql
INSERT INTO requests (id, requester_id, request_type, details)
VALUES ('REQ-999', 1, 'ขอใช้อุปกรณ์', 'ขอยืมโปรเจกเตอร์');
```

**ผลที่ได้**

```text
NOT NULL constraint failed: requests.location
```

ถูกปฏิเสธเนื่องจากไม่ได้ระบุค่า `location` ในคำสั่ง `INSERT` ขณะที่คอลัมน์ `location` ถูกกำหนดด้วย `NOT NULL` จึงไม่สามารถเพิ่มข้อมูลโดยไม่มีสถานที่ได้