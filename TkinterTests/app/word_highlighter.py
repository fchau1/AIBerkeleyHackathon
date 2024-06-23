import tkinter as tk
from tkinter.font import Font


class WordHighlighterApp:
    def __init__(self, master):
        self.master = master
        # Get screen width and height
        screen_width = self.master.winfo_screenwidth()
        screen_height = self.master.winfo_screenheight()
        # Set window size to screen size
        self.master.geometry(f"{screen_width}x{screen_height}+0+0")

        # Create a scrollbar first
        self.scrollbar = tk.Scrollbar(master)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Now adjust the canvas to fill the window and configure it to be scrollable
        # Notice the scrollbar is now defined before being used here
        self.canvas = tk.Canvas(
            master, bg="white", yscrollcommand=self.scrollbar.set)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Configure the scrollbar to command the canvas yview
        self.scrollbar.config(command=self.canvas.yview)

        # Scaling factor and font settings remain unchanged...
        self.scale_factor = 4
        # Scale up the font size
        self.font = ("Arial", int(12 * self.scale_factor))

        # Add a frame inside the canvas to hold the content
        self.frame = tk.Frame(self.canvas, bg="white")
        self.canvas_frame = self.canvas.create_window(
            (0, 0), window=self.frame, anchor="nw")

        # Provided Lorem Ipsum text and other initializations...
        self.text = ("Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
                     "when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
                     "It has survived not only five centuries, but also the leap into electronic typesetting, "
                     "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset "
                     "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software "
                     "like Aldus PageMaker including versions of Lorem Ipsum.")

        self.words = self.split_text_into_words(
            self.text, start_x=10, start_y=50, line_height=20 * self.scale_factor)
        self.draw_words()

        # Bind the <Motion> event to the canvas to track mouse movements
        self.canvas.bind('<Motion>', self.track_mouse)

        # Update the scrollregion to encompass the content
        self.frame.update_idletasks()
        self.canvas.config(scrollregion=self.canvas.bbox("all"))

        # Bind mouse wheel event for scrolling on Windows
        self.canvas.bind("<MouseWheel>", self.on_mousewheel)

    def split_text_into_words(self, text, start_x, start_y, line_height):
        words = text.split()
        positions = []
        x, y = start_x, start_y
        screen_width = self.master.winfo_screenwidth()
        font = Font(family="Arial", size=int(12 * self.scale_factor))
        for word in words:
            word_width = font.measure(word)
            if x + word_width > screen_width - 100:
                x = start_x
                y += line_height
            positions.append((word, x, y))
            x += word_width + 10 * self.scale_factor
        return positions

    def draw_words(self):
        self.word_boxes = []  # Store word bounding boxes and text ids
        for word, x, y in self.words:
            font = Font(family="Arial", size=int(12 * self.scale_factor))
            word_width = font.measure(word)
            bbox = (x, y, x + word_width + 2, y + 20 *
                    self.scale_factor)  # Example bbox calculation
            box_id = self.canvas.create_rectangle(
                bbox, outline="", fill="", tags="wordbox")
            text_id = self.canvas.create_text(
                x, y, text=word, fill="black", anchor="nw", font=self.font, tags="wordtext")
            self.word_boxes.append((box_id, text_id, bbox, word))

    def track_mouse(self, event):
        # Call update_highlights with the current mouse coordinates
        self.update_highlights((event.x, event.y))

    def update_highlights(self, new_coords):
        # Translate window coordinates (new_coords) to canvas coordinates
        canvas_coords = self.canvas.canvasx(
            new_coords[0]), self.canvas.canvasy(new_coords[1])

        # Iterate through the stored words and update highlights based on canvas_coords
        for box_id, text_id, bbox, word in self.word_boxes:
            if bbox[0] <= canvas_coords[0] <= bbox[2] and bbox[1] <= canvas_coords[1] <= bbox[3]:
                self.canvas.itemconfig(box_id, fill="light pink")
            else:
                self.canvas.itemconfig(box_id, fill="")

    def on_mousewheel(self, event):
        """Handle mouse wheel scroll for Windows and Linux."""
        # For MacOS, you might need to use event.delta directly
        self.canvas.yview_scroll(int(-1*(event.delta/120)), "units")


if __name__ == "__main__":
    root = tk.Tk()
    app = WordHighlighterApp(root)
    root.mainloop()
