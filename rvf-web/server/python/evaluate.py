import sys

url = sys.argv[1]
print("Processing image at " + url)

import urllib.request
from PIL import Image
import io
import torch
from torchvision.transforms import functional

with urllib.request.urlopen(url) as url:
    file = io.BytesIO(url.read())

img = Image.open(file)
img = functional.resize(img, (224, 224), antialias=True)

#plt.imshow(img)
#plt.show()

from model import Net2 # pylint: disable=unused-import
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = torch.load("./final_model.pth", map_location=device)
model.eval() # Evaluatioin mode
img_tensor= functional.to_tensor(img)
img_tensor= functional.normalize(img_tensor, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
# Add one extra dimesion to the 0th position to represent batch size. 
img_tensor=img_tensor.unsqueeze(0)

output=model(img_tensor)
_, predicted = torch.max(output.data, 1) # get predicted class
real_fake = "real" if predicted==0 else "fake"
print(f"Final Prediction: {predicted} ----> {real_fake}")