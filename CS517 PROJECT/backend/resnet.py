import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
import os
import numpy as np
import cv2


# Load pre-trained ResNet model
resnet = models.resnet18(pretrained=True)

# Remove last fully connected layer
resnet = nn.Sequential(*list(resnet.children())[:-1])

# Set model to evaluation mode
resnet.eval()


# Define image transformations
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])



# Extract features from images in dataset and save to file
dataset_dir = "dataset"
features_dir = "features"

for foldername in os.listdir(dataset_dir):
  for filename in os.listdir(os.path.join(dataset_dir, foldername)):
    img = cv2.imread(os.path.join(dataset_dir, foldername,filename))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = transform(img).unsqueeze(0)
    features = resnet(img).squeeze().detach().numpy()
    np.save(os.path.join(features_dir, filename[:-4]), features)


# Load query image and extract features
query_img = cv2.imread("query.jpeg")
query_img = cv2.cvtColor(query_img, cv2.COLOR_BGR2RGB)
query_img = transform(query_img).unsqueeze(0)
query_features = resnet(query_img).squeeze().detach().numpy()


# Calculate similarity between query image features and features of images in dataset
similarity_scores = {}
for filename in os.listdir(features_dir):
    features = np.load(os.path.join(features_dir, filename))
    similarity = np.dot(query_features, features) / (np.linalg.norm(query_features) * np.linalg.norm(features))
    similarity_scores[filename] = similarity

# Sort images based on similarity scores and return top K results
K = 10
top_k = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)[:K]
for filename, similarity_score in top_k:
    print(filename, similarity_score)