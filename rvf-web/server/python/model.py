import torch

class Net2(torch.nn.Module):
    def __init__(self):
        super(Net2, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 32, kernel_size = 3, padding = "same")
        self.conv2 = torch.nn.Conv2d(32, 64, kernel_size = 3, stride = 1, padding = "same")
        self.conv3 = torch.nn.Conv2d(64, 128, kernel_size = 3, stride = 1, padding = "same")
        self.conv4 = torch.nn.Conv2d(128 ,128, kernel_size = 3, stride = 1, padding = "same")
        self.conv5 = torch.nn.Conv2d(128, 256, kernel_size = 3, stride = 1, padding = "same")
        self.conv6 = torch.nn.Conv2d(256, 256, kernel_size = 3, stride = 1, padding = "same")
        self.dense1_v2 = torch.nn.Linear(2304, 768)
        self.dense2_v2 = torch.nn.Linear(768, 384)
        self.dense3_v2 = torch.nn.Linear(384, 2)
        self.norm_layer1 = torch.nn.BatchNorm2d(32)
        self.norm_layer2 = torch.nn.BatchNorm2d(64)
        self.norm_layer3 = torch.nn.BatchNorm2d(128)
        self.norm_layer4 = torch.nn.BatchNorm2d(128)
        self.norm_layer5 = torch.nn.BatchNorm2d(256)
        self.norm_layer6 = torch.nn.BatchNorm2d(256)
        self.dropout1 = torch.nn.Dropout(0.2)
        self.dropout2 = torch.nn.Dropout(0.3)
        self.pool = torch.nn.MaxPool2d(2,2)
        self.activation = torch.nn.ReLU()
        self.flatten = torch.nn.Flatten()
        self.init_weight()
    def init_weight(self):
        conv = [self.conv1, self.conv2, self.conv3, self.conv4, self.conv5]
        dense = [self.dense1_v2, self.dense2_v2]
        for layer in conv:
            torch.nn.init.kaiming_normal_(layer.weight, nonlinearity='relu')
            torch.nn.init.zeros_(layer.bias)
        for layer in dense:
            torch.nn.init.kaiming_normal_(layer.weight, nonlinearity='relu')
            torch.nn.init.zeros_(layer.bias)
    def forward(self, x):
        x = self.pool(self.activation(self.norm_layer1(self.conv1(x))))
        x = self.pool(self.activation(self.norm_layer2(self.conv2(x))))
        x = self.pool(self.activation(self.norm_layer3(self.conv3(x))))
        x = self.pool(self.activation(self.norm_layer4(self.conv4(x))))
        x = self.pool(self.activation(self.norm_layer5(self.conv5(x))))
        x = self.dropout1(x)
        x = self.pool(self.activation(self.norm_layer6(self.conv6(x))))
        x = self.dropout2(x)
        x = self.flatten(x)
        x = self.activation(self.dense1_v2(x))
        x = self.activation(self.dense2_v2(x))
        return self.dense3_v2(x)