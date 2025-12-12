#!/bin/bash

# Find all page.tsx files and add dynamic exports if they don't exist
find app -name "page.tsx" -type f | while read file; do
  # Check if file already has dynamic export
  if ! grep -q "export const dynamic" "$file"; then
    # Check if it's a client component
    if grep -q "^['\"]use client['\"]" "$file"; then
      # Add dynamic export after "use client"
      sed -i '' '/^['\''"]use client['\''"]/a\
\
export const dynamic = '\''force-dynamic'\''\
export const revalidate = 0
' "$file"
      echo "Added dynamic export to: $file"
    fi
  fi
done

# Also add to all layout files
find app -name "layout.tsx" -type f | while read file; do
  if ! grep -q "export const dynamic" "$file"; then
    # Add at the top after imports
    if grep -q "^import" "$file"; then
      # Find the last import line and add after it
      awk '/^import/ {last=NR} last && NR==last+1 && !done {print "\nexport const dynamic = '\''force-dynamic'\''\nexport const revalidate = 0\n"; done=1} 1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
      echo "Added dynamic export to: $file"
    fi
  fi
done
