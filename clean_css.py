import re

css_p = r'c:\Users\CARLA\Desktop\job\me\css\styles.css'
with open(css_p, 'r', encoding='utf-8') as f:
    css = f.read()

# Fix space-y
css = re.sub(r'space-y:\s*[^;]+;', '', css)

# Standardize text/bg for light mode visibility
# Already did some in multi_replace, but let's be thorough.
# Ensure --text-main is dark in light mode
css = re.sub(r'(--text-main:\s*)var\(--gradient-1\)', r'\1#0f172a', css)

# Remove all @apply lines
css = re.sub(r'@apply\s+[^;]+;', '', css)

# Since some @apply were used for services, let's add basic styles back if they are empty
# (The user likely has some styles from before as well, but @apply lines would be ignored by browser)
# Actually, I'll just remove the @apply rules and see if the existing rules cover it.
# If I look at lines 1010-1040, those are already using standard CSS.
# The @apply ones were redundant or broken additions.

with open(css_p, 'w', encoding='utf-8') as f:
    f.write(css)

print("Cleaned up CSS")
