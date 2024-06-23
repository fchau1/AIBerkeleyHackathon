import tkinter as tk

from app.word_highlighter import WordHighlighter

def main():

    root = tk.Tk()

    app = WordHighlighter(master=root)

    app.mainloop()

if __name__ == "__main__":

    main()
