with open('assets/css/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'col-' in line or 'col ' in line or 'col{' in line or 'latest-sequences-grid' in line:
        print(f"Line {i+1}: {line.strip()}")
