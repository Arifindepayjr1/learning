from PIL import Image

# Open the image
img = Image.open(r"C:\Users\ARIFIN\OneDrive\AppData\Documents\Desktop\learning\character\walk.png")

# Resize the image to 16x16
img_resized = img.resize((32, 16))

# Save the resized image
img_resized.save("walk1.png")
