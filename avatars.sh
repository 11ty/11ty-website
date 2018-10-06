for handle in $(cat _data/testimonials.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget -O img/avatars/${handle}.jpg https://twitter.com/${handle}/profile_image?size=bigger
  fi
done

for handle in $(cat _data/eleventysites.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget -O img/avatars/${handle}.jpg https://twitter.com/${handle}/profile_image?size=bigger
  fi
done

for handle in $(cat _data/eleventysites.json | jq -r '.[] | .avatar_filename'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    src=$(cat _data/eleventysites.json | jq -r ".[] | select(.avatar_filename == \"$handle\") | .avatar_src")
    echo ${src}
    wget -O img/avatars/${handle} ${src}
  fi
done
