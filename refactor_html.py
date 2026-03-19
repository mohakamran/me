import re

html_p = r'c:\Users\CARLA\Desktop\job\me\index.html'
with open(html_p, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace text-muted equivalents (gray/slate)
# Only if not followed by a specific hex or something we want to keep
html = re.sub(r'text-gray-(300|400|500|600)', 'text-[var(--text-muted)]', html)
html = re.sub(r'text-slate-(400|500)', 'text-[var(--text-muted)]', html)

# Replace text-main equivalents (white/very light)
# Be careful: we want to avoid replacing text-white on gradient buttons.
# Usually gradient buttons have 'bg-gradient-to-r' or similar.
# Let's target text-white and text-slate-100/200 selectively or just do a general swap and then fix buttons.
# A better way: replace text-white only if it's NOT inside a button with bg-teal or bg-cyan gradient.
# But regex is hard for that. Let's do a broad swap and then fix common white-text-needs cases.

html = html.replace('text-white', 'text-[var(--text-main)]')
html = html.replace('text-slate-100', 'text-[var(--text-main)]')
html = html.replace('text-slate-200', 'text-[var(--text-main)]')

# Fix buttons that NEED white text (gradients)
html = re.sub(r'(hover:from-teal-600[^>]*text-\[var\(--text-main\)\])', r'\1 !text-white', html)
# Actually, it's easier to just use !text-white in the CSS for those buttons or just fix it here.
# Let's fix the common CTA buttons in hero.
html = html.replace('bg-gradient-to-r from-cyan-500 to-teal-500 text-[var(--text-main)]', 'bg-gradient-to-r from-cyan-500 to-teal-500 !text-white')
html = html.replace('bg-gradient-to-r from-teal-500 to-cyan-500 text-[var(--text-main)]', 'bg-gradient-to-r from-teal-500 to-cyan-500 !text-white')

# Backgrounds
html = re.sub(r'bg-gray-(800|900|700)/[0-9]+', 'bg-[var(--bg-card)]', html)
html = re.sub(r'bg-gray-(800|900|700)', 'bg-[var(--bg-card)]', html)
html = re.sub(r'bg-slate-(800|900|700)', 'bg-[var(--bg-card)]', html)

# Borders
html = re.sub(r'border-gray-(600|700|800)/[0-9]+', 'border-[var(--border-color)]', html)
html = re.sub(r'border-gray-(600|700|800)', 'border-[var(--border-color)]', html)
html = re.sub(r'border-white/10', 'border-[var(--border-color)]', html)

with open(html_p, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML Refactored for theme awareness")
