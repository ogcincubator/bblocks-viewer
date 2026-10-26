#!/bin/sh

if [ ! -d /register ]; then
  echo "Creating dummy /register"
  mkdir /register
fi

REGISTER_URL=/register
if [ -z "${REGISTER_FILE}" ]; then
  for P in 'build-local' 'build' ''; do
    if [ -f "/register/${P}/register.json" ]; then
      REGISTER_FILE="${P}/register.json"
      break
    fi
  done
fi

if [ -z "${REGISTER_FILE}" ]; then
  echo "Error: register local URL could not be determined" >&2
  exit 1
fi

REGISTER_URL="${REGISTER_URL}/${REGISTER_FILE}"

# Local URL mappings (only present in locally-built registers): serve each mapped
# directory under /local-mappings/<n>/ and tell the viewer which remote prefixes to swap.
# Relative paths are resolved against the register directory, as in the postprocessor.
jq -r '(.localUrlMappings // {}) | to_entries | to_entries[]
  | "location /local-mappings/\(.key)/ { add_header Cache-Control no-cache; alias \(.value.value | if startswith("/") then . else "/register/" + . end | rtrimstr("/"))/; }"' \
  < "/register/$REGISTER_FILE" > /etc/nginx/local-mappings.conf
LOCAL_URL_MAPPINGS=$(jq -c '(.localUrlMappings // {}) | to_entries | to_entries
  | map({key: .value.key, value: "/local-mappings/\(.key)/"}) | from_entries' < "/register/$REGISTER_FILE")

cat << EOF > /app/config.js
window.bblocksRegister = ['${REGISTER_URL}'];
window.bblocksViewer = {
  title: $(jq '.name // "Building Blocks Register"' < "/register/$REGISTER_FILE"),
  baseUrl: '/',
  localUrlMappings: ${LOCAL_URL_MAPPINGS},
};
EOF

for arg in "$@"; do
  if [ "${arg}" = "--debug" ]; then
    sed -i '/# DEBUG$/d' /etc/nginx/nginx.conf
  fi
done

export VITE_BASE_URL=/
export VITE_DYNAMIC_BASE_URL=

echo "Building Blocks viewer running on http://localhost:9090 (remember to check your forwarded ports)"

exec nginx -g "daemon off;"
