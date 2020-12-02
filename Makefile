.SUFFIXES:
ALL=rules.dnd

index.html: $(ALL) dd.css dd.js links.json Makefile
	rm -rf build
	mkdir build
	cat $(ALL) > build/rules.dnd
	python3 -m ez_dungeon.document build/rules.dnd build
	cp build/rules.html index.html
	rm -rf build

validate:
	python3 -m ez_dungeon.html_validate index.html

$(basename $(ALL)):
	rm -rf build
	mkdir build
	python3 -m ez_dungeon.document $(addsuffix .dnd,$@) build

make clean:
	rm -f index.html
.DEFAULT:index.html
.PHONY: strip
strip:
	python3 stripper.py
$(ALL): strip
