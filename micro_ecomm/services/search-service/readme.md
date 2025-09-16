# Tạo venv
python -m venv venv

# Kích hoạt venv (PowerShell)
.\venv\Scripts\Activate.ps1
2️⃣ Cài FastAPI + các package cần thiết
pip install fastapi uvicorn redis pydantic
Tạo file main.py
New-Item main.py

pip install elasticsearch

5️⃣ Chạy FastAPI
uvicorn main:app --reload --host 0.0.0.0 --port 8000