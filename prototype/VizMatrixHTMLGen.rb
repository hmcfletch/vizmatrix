filename = "HTMLbase.html"
jsdatafile = "data.js"

# BEGIN CONFIGURATION VARIABLES #
x = 800
y = 800
cellsize = 1
threshold = 0.1
# END CONFIGUREATION VARIABLES #

file = File.new(filename,"r")
html = ""
data = {}

while (line = file.gets):
    html += line
end

i = 0
j = 0

while ( i < x ):
    j = 0
    while ( j < y ):
        if (rand(0) < threshold ):
            value = rand(1000);
            data[i] ||= {}
            data[i][j] = value
        end
        j += 1
    end
    i += 1
end

data_str = "var data2 = {";

for k in data.keys
    data_str << "\"#{k}\": {"
    for l in data[k].keys
        data_str << "\"#{l}\": #{data[k][l]},";
    end
    data_str << "},"
end

data_str << "};"

data_fh = File.new(jsdatafile,"w")
data_fh.puts data_str

html.gsub!(/CELLSIZE/) { cellsize }
html.gsub!(/HEIGHT/) { y }
html.gsub!(/WIDTH/) { x }

puts html
