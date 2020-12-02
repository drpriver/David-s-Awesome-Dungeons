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
        with open(f, 'r') as fp:
            lines = []
            for line in fp:
                line = line.rstrip()
                if not line and not lines:
                    continue
                lines.append(line)
            if lines:
                while not lines[-1]:
                    lines.pop()
        with open(f, 'w') as fp:
            for line in lines:
                print(line, file=fp)
    
if __name__ == '__main__':
    main()
