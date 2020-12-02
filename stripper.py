import os

def find_files(d):
    result = []
    for f in os.listdir(d):
        if f.startswith('.'):
            continue
        p = os.path.join(d, f)
        if os.path.isfile(p):
            if f.endswith('.dnd'):
                result.append(p)
        elif os.path.isdir(p):
            result += find_files(p)
    return result
        

def main():
    files = find_files('.')
    for f in files:
        changed = False
        with open(f, 'r') as fp:
            lines = []
            for line in fp:
                stripped = line.rstrip()
                if stripped+'\n' != line:
                    changed = True
                line = stripped
                if not line and not lines:
                    changed = True
                    continue
                lines.append(line)
            if lines:
                while not lines[-1]:
                    changed = True
                    lines.pop()
        if changed:
            print(f)
            with open(f, 'w') as fp:
                for line in lines:
                    print(line, file=fp)
    
if __name__ == '__main__':
    main()
