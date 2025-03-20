from PIL import Image

# Open the image
img = Image.open("C:\Users\ARIFIN\OneDrive\AppData\Documents\Desktop\learning\character.png")

# Resize the image to 16x16
img_resized = img.resize((16, 16))

# Save the resized image
img_resized.save("walk.png")
