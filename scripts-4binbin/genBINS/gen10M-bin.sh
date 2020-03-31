echo "creating 10MB binary file data.dat..."
dd  if=/dev/urandom  of=data.dat  bs=1024  count=10000
