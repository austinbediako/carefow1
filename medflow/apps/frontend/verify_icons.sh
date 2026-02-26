#!/bin/bash
icons=(
  "color/48/marker--v1.png"
  "color/48/phone.png"
  "color/48/new-post.png"
  "color/48/facebook-new.png"
  "color/48/twitter--v1.png"
  "color/48/instagram-new--v1.png"
  "color/48/rss.png"
  "color/96/stethoscope.png"
  "color/96/baby.png"
  "color/96/activity.png"
  "color/96/arrow-right.png"
  "color/96/calendar--v1.png"
  "color/96/user.png"
  "color/96/heart-with-pulse.png"
  "color/96/target.png"
  "color/96/idea.png"
  "color/96/shield.png"
  "color/96/user-group-man-man.png"
  "color/96/prize.png"
  "color/96/security-checked.png"
  "color/96/flash-on.png"
  "color/96/city-buildings.png"
  "color/96/network.png"
  "color/96/handshake.png"
)

for icon in "${icons[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}\n" -I "https://img.icons8.com/$icon")
  if [ "$status" != "200" ]; then
    echo "FAILED: $icon ($status)"
  fi
done
echo "DONE"
