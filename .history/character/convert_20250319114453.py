from PIL import Image

# Open the image
img = Image.open("walk.png")

# Resize the image to 16x16
img_resized = img.resize((16, 16))

# Save the resized image
img_resized.save("walk.png")
