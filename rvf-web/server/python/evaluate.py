import sys

url = sys.argv[1]
session = sys.argv[2]


import matplotlib.pyplot as plt
import urllib.request
from PIL import Image
import io
import torch
import numpy as np
from torchvision.transforms import functional

with urllib.request.urlopen(url) as url:
    file = io.BytesIO(url.read())

img = Image.open(file)
img = functional.resize(img, (224, 224), antialias=True)

#plt.imshow(img)
#plt.show()

from model import Net2 # pylint: disable=unused-import
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = torch.load("./final_model2.pth", map_location=device)
model.eval() # Evaluatioin mode
img_tensor= functional.to_tensor(img)
img_tensor= functional.normalize(img_tensor, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
# Add one extra dimesion to the 0th position to represent batch size. 
img_tensor=img_tensor.unsqueeze(0)

output=model(img_tensor)
_, predicted = torch.max(output.data, 1) # get predicted class
real_fake = "real" if predicted==1 else "fake"
print(f"Final Prediction: {predicted} ----> {real_fake}")

# Import necessary gradcam libraries
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image

# Create grad cam with model and convo layers
cam = GradCAM(model=model, target_layers=[model.conv2, model.conv3])

# What part of the image contribute to the decision of fake prediction? 
targets = [ClassifierOutputTarget(0)]

# Cam with img tensor and target 
grayscale_cam = cam(input_tensor=img_tensor, targets=targets)

# In this example grayscale_cam has only one image in the batch:
grayscale_cam = grayscale_cam[0, :]

# Normalize img for subsequent gradcam operations
img = np.float32(img) / 255
visualization = show_cam_on_image(img, grayscale_cam, use_rgb=True)

# Display ---- 
import warnings

# matplotlib bug https://github.com/matplotlib/matplotlib/issues/23921
warnings.filterwarnings("ignore")


plt.imshow(visualization)

plt.savefig(f"../public/grad{session}.png", bbox_inches='tight', pad_inches=0.05) 