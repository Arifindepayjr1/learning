from PIL import Image

# Open the image
img = Image.open("sprite_64x64.png")

# Resize the image to 16x16
img_resized = img.resize((16, 16))

# Save the resized image
img_resized.save("sprite_16x16.png")
