for handle in $(cat _data/testimonials.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget https://twitter.com/${handle}/profile_image?size=bigger
    mv profile_image?size=bigger img/avatars/${handle}.jpg
  fi
done

for handle in $(cat _data/eleventysites.json | jq -r '.[] | .twitter'); do
  if [[ "$handle" == "" || "$handle" == "null" ]]
  then
    echo "$handle is not valid";
  else
    echo ${handle}
    wget https://twitter.com/${handle}/profile_image?size=bigger
    mv profile_image?size=bigger img/avatars/${handle}.jpg
  fi
done
