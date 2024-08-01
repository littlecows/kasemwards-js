import hashlib
import random

def generate_id():
    random_num = str(random.randint(0, 99999999)).encode()

    hash_obj = hashlib.sha256(random_num)
    hex_digit = hash_obj.hexdigest()

    return hex_digit[:20]