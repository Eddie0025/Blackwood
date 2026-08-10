from PIL import Image, ImageDraw

# Open the original logo
logo = Image.open('public/logo.png').convert("RGBA")

# Create a 512x512 transparent canvas
size = 512
bg = Image.new('RGBA', (size, size), (255, 255, 255, 0))

# Draw a black square slightly smaller than the canvas to leave a transparent border
# This tricks Safari into recognizing transparency, so it won't add its own white border
draw = ImageDraw.Draw(bg)
padding = 16
draw.rounded_rectangle([padding, padding, size-padding, size-padding], radius=64, fill=(10, 10, 10, 255))

# Calculate size to fit the logo inside the black box
logo_max_size = size - (padding * 2) - 64
logo.thumbnail((logo_max_size, logo_max_size), Image.Resampling.LANCZOS)

# Calculate position to center the logo
x = (size - logo.width) // 2
y = (size - logo.height) // 2

# Paste the logo onto the background
bg.paste(logo, (x, y), logo)

# Save as PNG
bg.save('public/favicon.png', 'PNG')
print("Favicon generated successfully!")
