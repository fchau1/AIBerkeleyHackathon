import tkinter as tk
from random import randint
import time

class EyeTrackerApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Red Dot Tracker")
        
        # Get screen width and height
        screen_width = self.master.winfo_screenwidth()
        screen_height = self.master.winfo_screenheight()
        
        # Set window size to screen size
        self.master.geometry(f"{screen_width}x{screen_height}+0+0")
        
        self.canvas = tk.Canvas(self.master, bg='white')
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        # Initial red dot position
        self.update_dot(50, 50)
        
    def update_dot(self, x, y):
        self.canvas.delete("all")  # Clear previous dot
        self.canvas.create_oval(x-5, y-5, x+5, y+5, fill='red', outline='red')
        
def simulate_coordinates(app):
    for _ in range(100):  # Simulate 100 updates
        x, y = randint(0, app.master.winfo_screenwidth()), randint(0, app.master.winfo_screenheight())
        app.update_dot(x, y)
        app.master.update()
        time.sleep(0.1)  # Update every 0.1 seconds

if __name__ == "__main__":
    root = tk.Tk()
    app = EyeTrackerApp(root)
    
    # Simulate a continuous stream of coordinates
    root.after(100, simulate_coordinates, app)
    
    root.mainloop()
