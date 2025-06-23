from faker import Faker
import random

faker = Faker()

# Define base product names and categories
base_products = [
    ("Oromo Handwoven Coffee Tray", "Home Decor", "/src/assets/artefact2.webp"),
    ("Traditional Jebena Coffee Pot", "Coffee & Ceramics", "/src/assets/coffe1.jpg"),
    ("Cultural Beaded Necklace", "Jewelry & Accessories", "/src/assets/artefact4.jpg"),
    ("Oromo Cotton Shawl", "Clothing & Fabrics", "/src/assets/cloth2.jpg"),
    ("Embroidered Wall Tapestry", "Home Decor", "/src/assets/artefact1.jpg"),
]

# Utility function to create a fake product
def generate_product(pid):
    base = base_products[(pid - 1) % len(base_products)]
    name = f"{base[0]} #{pid}"
    price = f"${round(random.uniform(18.0, 65.0), 2)}"
    rating = round(random.uniform(4.2, 5.0), 1)
    stock = random.randint(3, 25)
    description = faker.sentence(nb_words=12)
    details = faker.paragraph(nb_sentences=5)
    
    return {
        "id": pid,
        "name": name,
        "price": price,
        "category": base[1],
        "imageUrl": base[2],
        "description": description,
        "details": details,
        "rating": rating,
        "stock": stock
    }

# Generate products from 16 to 45
generated_products = [generate_product(i) for i in range(16, 46)]
generated_products[:3]  # previewing the first 3 of the generated list
