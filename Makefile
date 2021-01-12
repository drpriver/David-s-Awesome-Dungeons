.SUFFIXES:
DEPDIR := Depends
$(DEPDIR): ; @mkdir -p $@
%.dep: ;
DEPFILES:= $(wildcard $(DEPDIR)/*.dep)
$(DEPFILES):
include $(DEPFILES)

BUILDDIR := Build
$(BUILDDIR): ; mkdir -p $@

index.html: $(BUILDDIR)/rules.html
	cp $(BUILDDIR)/rules.html index.html

$(BUILDDIR)/rules.html: $(DEPDIR)/rules.dep | $(DEPDIR) $(BUILDDIR)
	python3 -m ezhtml rules.dnd $(BUILDDIR) -d $(DEPDIR)/rules.dep


.PHONY: validate
validate: index.html
	python3 -m ezhtml.html_validate index.html

.PHONY: clean
clean:
	rm -f index.html
	rm -rf $(BUILDDIR)

.DEFAULT_GOAL:=index.html
.PHONY: strip
strip:
	python3 stripper.py
