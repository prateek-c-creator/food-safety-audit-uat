"""Builds the app icons at deploy time (keeps binary files out of the repository)."""
import os
from PIL import Image, ImageDraw

def make(n):
    k = 4
    S = n * k
    im = Image.new("RGB", (S, S), (20, 40, 90))
    d = ImageDraw.Draw(im)
    d.rectangle([0, int(S * .78), S, int(S * .84)], fill=(242, 183, 5))
    d.rounded_rectangle([int(S * .27), int(S * .14), int(S * .73), int(S * .70)], radius=int(S * .04), outline=(255, 255, 255), width=int(S * .035))
    d.rounded_rectangle([int(S * .40), int(S * .09), int(S * .60), int(S * .19)], radius=int(S * .025), fill=(255, 255, 255))
    d.line([(int(S * .36), int(S * .43)), (int(S * .46), int(S * .54)), (int(S * .65), int(S * .30))], fill=(31, 170, 89), width=int(S * .045), joint="curve")
    return im.resize((n, n), Image.LANCZOS)

os.makedirs("www/icons", exist_ok=True)
for name, n in [("icon-192.png", 192), ("icon-512.png", 512), ("apple-touch-icon.png", 180)]:
    make(n).save(os.path.join("www/icons", name))
print("icons written")
