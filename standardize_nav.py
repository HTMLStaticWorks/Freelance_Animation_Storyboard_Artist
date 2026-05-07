import os
import re

header_template = """    <header>
        <div class="nav-container">
            <a href="index.html" class="logo"><i class="fas fa-clapperboard me-2"></i>ARTIST_X</a>

            <nav class="nav-links" id="nav-links">
                <div class="nav-item">
                    <a href="index.html">Home ▾</a>
                    <div class="dropdown">
                        <a href="index.html">Style 1</a>
                        <a href="home-2.html">Style 2</a>
                    </div>
                </div>
                <div class="nav-item"><a href="portfolio.html">Portfolio</a></div>
                <div class="nav-item"><a href="sequences.html">Sequences</a></div>
                <div class="nav-item"><a href="characters.html">Characters</a></div>
                <div class="nav-item"><a href="blog.html">Blog</a></div>
                <div class="nav-item"><a href="contact.html">Contact</a></div>
                <div class="nav-item"><a href="dashboard.html">Dashboard</a></div>
                <div class="nav-item mobile-only mt-4">
                    <a href="signup.html" class="btn btn-primary w-100">Sign Up</a>
                </div>
                <div class="nav-item mobile-only mt-4">
                    <div class="d-flex gap-3 justify-content-center">
                        <button class="theme-toggle rtl-toggle-btn">RTL</button>
                        <button class="theme-toggle theme-toggle-btn">☀️</button>
                    </div>
                </div>
            </nav>

            <div class="nav-right">
                <button class="theme-toggle rtl-toggle-btn">RTL</button>
                <button class="theme-toggle theme-toggle-btn">☀️</button>
                <div class="auth-btns">
                    <a href="login.html" class="btn btn-outline">Login</a>
                    <a href="signup.html" class="btn btn-primary">Sign Up</a>
                </div>
                <button class="mobile-toggle" id="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>"""

files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['login.html', 'signup.html', 'dashboard.html']]

for f in files:
    if not os.path.isfile(f):
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Use regex to find the header block and replace it
    new_content = re.sub(r'<header>.*?</header>', header_template, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
    else:
        print(f"No changes for {f}")
