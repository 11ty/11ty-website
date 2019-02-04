# uses https://github.com/sindresorhus/file-type-cli
filemap=""
addComma="no"

function getAvatar() {
  filename=$1
  src=$2
  wget --quiet -O img/avatars/${filename} $src
}

function optimizeImageByFileName() {
  handle=$1
  extension=$1
  file="img/avatars/${filename}"
  type=$(file-type $file)
  if [[ $type == *"image/jpeg"* ]]
  then
    jpegtran "$file" > "$file."
    mv "$file." "$file"
  fi

  if [[ $type == *"image/png"* ]]
  then
    pngcrush -brute "$file"{,.}
    rm "img/avatars/${filename}"
    mv "img/avatars/${filename}." "img/avatars/${filename}"
  fi
}

function optimizeImage() {
  handle=$1
  file="img/avatars/${handle}.jpg"
  type=$(file-type $file)
  if [[ $type == *"image/jpeg"* ]]
  then
    jpegtran "$file" > "$file."
    mv "$file." "$file"
  fi

  if [[ $type == *"image/png"* ]]
  then
    pngcrush -brute "$file"{,.}
    rm img/avatars/${handle}.jpg
    mv img/avatars/${handle}.jpg. img/avatars/${handle}.png

    if [[ "$addComma" == "no" ]]
    then
      addComma="yes"
    else
      filemap="$filemap,"
    fi
    filemap="$filemap\n\t\"$handle\": \"$handle.png\""
  fi
}

for jsonFile in _data/sites/*.json
do
  # Build with Eleventy sites, twitter avatars
  for handle in $(cat "$jsonFile" | jq -r '.twitter'); do
    if [[ "$handle" == "" || "$handle" == "null" ]]
    then
      echo "no twitter handle found for $jsonFile";
    else
      echo ${handle}
      getAvatar "$handle.jpg" "https://twitter.com/${handle}/profile_image?size=bigger"
      optimizeImage $handle
    fi
  done

  # Build with Eleventy sites, avatar filenames
  for filename in $(cat "$jsonFile" | jq -r '.avatar_filename'); do
    if [[ "$filename" != "" && "$filename" != "null" ]]
    then
      src=$(cat "$jsonFile" | jq -r ".avatar_src")
      echo ${src}
      getAvatar $filename $src
      optimizeImageByFileName $filename
    fi
  done
done

# Testimonials
for handle in $(cat _data/testimonials.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    getAvatar "$handle.jpg" "https://twitter.com/${handle}/profile_image?size=bigger"
    optimizeImage $handle
  fi
done

# Starter sites
for handle in $(cat _data/starters.json | jq -r '.[] | .author'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    getAvatar "$handle.jpg" "https://twitter.com/${handle}/profile_image?size=bigger"
    optimizeImage $handle
  fi
done

# Extra avatars not listed in other methods
for handle in $(cat _data/extraAvatars.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    getAvatar "$handle.jpg" "https://twitter.com/${handle}/profile_image?size=bigger"
    optimizeImage $handle
  fi
done

echo "{$filemap\n}" > _data/avatarFileMap.json