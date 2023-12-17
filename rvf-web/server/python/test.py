import matplotlib.pyplot as plt
import urllib.request
from PIL import Image
import io
import torch
from torchvision.transforms import functional

url = "https://upcdn.io/W142hJk/raw/demo/4kxNQ7nt9w.jpeg"

with urllib.request.urlopen(url) as url:
    file = io.BytesIO(url.read())

img = Image.open(file)
img = functional.resize(img, (224, 224), antialias=True)

plt.imshow(img)
plt.show()
