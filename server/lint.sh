echo "Linting project..."

# find . -regextype egrep -iregex ".*\.py" -type f -not -path '*/__pycache__/*' -not -path '*/bin/*' -not -path '*/obj/*' -not -path '*/.git/*' -not -path '*/.svn/*' -not -path '*/node_modules/*' -not -path '*/.ionide/*' -exec autopep8 --in-place --aggressive --aggressive "{}" \; 
autopep8 .

echo "Projected Linted!"

