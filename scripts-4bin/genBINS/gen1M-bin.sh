echo "creating 1MB binary file data.dat..."
dd  if=/dev/urandom  of=data.dat  bs=1024  count=1000
