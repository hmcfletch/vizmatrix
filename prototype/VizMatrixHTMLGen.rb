filename = "HTMLbase.html"
jsdatafile = "data.js"

# BEGIN CONFIGURATION VARIABLES #
x = 200
y = 200
cellsize = 1
threshold = 0.01
# END CONFIGUREATION VARIABLES #

file = File.new(filename,"r")
html = ""
data = []

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
            data << { 'i' => i, 'j' => j, 'val' => value }
        end
        j += 1
    end
    i += 1
end

data2 = []
for nz in data
    data2 << "{ \"i\":#{nz['i']},\"j\":#{nz['j']},\"val\":#{nz['val']}}"
end

data_str = "var data = { \"data\":[" + data2.join(",") + "] }"

data_fh = File.new(jsdatafile,"w")
data_fh.puts data_str

html.gsub!(/CELLSIZE/) { cellsize }
html.gsub!(/HEIGHT/) { y }
html.gsub!(/WIDTH/) { x }

puts html
