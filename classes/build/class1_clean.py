"""Make the public copy of Class 1 from the master deck (the one in the Claude project).

The training site is public, so this:
- blurs the real customer's name and address in the screenshots,
- swaps the customer's name in the call and slides for a made-up one
  (the account number, 000930, stays so the steps still work in TST),
- drops the Part 1 call recording, which says the real name and is already
  switched off in the deck (the captions play instead).

Usage: python3 class1_clean.py <master deck html> <output html>
"""
import base64, io, re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from deck import pixelate
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()

BLUR = {  # boxes in each embedded screenshot's own pixels (1098 wide)
    'header':    [(388, 128, 530, 172), (193, 416, 645, 439)],
    'details':   [(382, 98, 515, 122), (382, 270, 515, 322)],
    'lineadded': [(190, 84, 330, 108)],
    'poentered': [(388, 97, 520, 121)],
    'poalert':   [(340, 100, 515, 120)],
}

def fix_img(m):
    key, mime, data = m.group(1), m.group(2), m.group(3)
    if key not in BLUR:
        return m.group(0)
    im = pixelate(Image.open(io.BytesIO(base64.b64decode(data))).convert('RGB'), BLUR[key])
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=85)
    return f"{key}:'data:{mime};base64,{base64.b64encode(buf.getvalue()).decode()}'"

block = re.search(r'const IMGS=\{.*?\};', s, re.S)
s = s[:block.start()] + re.sub(r"(\w+):'data:(image/[a-z]+);base64,([A-Za-z0-9+/=]+)'", fix_img, block.group(0)) + s[block.end():]

# Part 1 recording names the real customer; it's already off (AUD.p1=null), so don't ship it.
s, n = re.subn(r"p1:\{src:'data:audio/mpeg;base64,[A-Za-z0-9+/=]+',t:\[[^\]]*\]\}", 'p1:null', s)
assert n == 1, 'Part 1 audio not found'

NAME = 'Prairie Floor Co.'
for a, b in [('Aladdin Carpet Company', NAME), ('Aladdin Carpet', NAME)]:
    s = s.replace(a, b)
s = s.replace("Everyone uses the same account, 000930 (" + NAME + ").",
              "Everyone uses the same account, 000930. The deck calls the customer " + NAME + " because the training site is public; in TST the account shows the real customer's name.")
assert 'Aladdin' not in s and 'ALADDIN' not in s
open(out, 'w', encoding='utf-8').write(s)
print(out, os.path.getsize(out))
