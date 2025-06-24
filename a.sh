#!/bin/bash

base="src/components/sellers"

# Create stage folders and files
for i in 1 2 3 4 5; do
  stage_dir="$base/stage$i"
  mkdir -p "$stage_dir"
  touch "$stage_dir/$(case $i in
    1) echo 'BasicInfo.tsx' ;;
    2) echo 'AddressStep.tsx' ;;
    3) echo 'Documents.tsx' ;;
    4) echo 'Subscription.tsx' ;;
    5) echo 'Review.tsx' ;;
  esac)"
done

# Create SellerPopup.tsx at the base
touch "$base/SellerPopup.tsx"

echo "Seller popup structure created at $base ✅"
