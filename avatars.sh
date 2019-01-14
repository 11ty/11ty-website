# uses https://github.com/sindresorhus/file-type-cli
filemap=""
addComma="no"

for handle in $(cat _data/testimonials.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget --quiet -O img/avatars/${handle}.jpg https://twitter.com/${handle}/profile_image?size=bigger

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
  fi
done

for handle in $(cat _data/eleventysites.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget --quiet -O img/avatars/${handle}.jpg https://twitter.com/${handle}/profile_image?size=bigger

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
  fi
done

for handle in $(cat _data/eleventysites.json | jq -r '.[] | .avatar_filename'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    src=$(cat _data/eleventysites.json | jq -r ".[] | select(.avatar_filename == \"$handle\") | .avatar_src")
    echo ${src}
    wget --quiet -O img/avatars/${handle} ${src}

    file="img/avatars/${handle}"
    type=$(file-type $file)
    if [[ $type == *"image/jpeg"* ]]
    then
      jpegtran "$file" > "$file."
      mv "$file." "$file"
    fi

    if [[ $type == *"image/png"* ]]
    then
      pngcrush -brute "$file"{,.}
      mv img/avatars/${handle}. img/avatars/${handle}
    fi

    # avatar_filename should match up and handle the correct file type
  fi
done

echo "{$filemap\n}" > _data/avatarFileMap.json