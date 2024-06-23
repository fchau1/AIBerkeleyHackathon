import cv2
import mediapipe as mp
import time
import HandTrackingModule as htm
pTime = 0
cTime = 0
detector = htm.handDetector(detectionCon=0.75)


def check_next(lmList):
    # Thumb right, all other fingers curled
    if all(lmList[4][1] < lmList[i][1] for i in [8, 12, 16, 20]):
        # Check if other fingers are curled (tip y-coordinate less than metacarpal base y-coordinate)
        if all(lmList[i][2] > lmList[i-3][2] for i in [8, 12, 16, 20]):
            return True
    return False


def check_prev(lmList):
    # Thumb left, all other fingers curled
    if all(lmList[4][1] > lmList[i][1] for i in [8, 12, 16, 20]):
        # Check if other fingers are curled (tip y-coordinate less than metacarpal base y-coordinate)
        if all(lmList[i][2] > lmList[i-3][2] for i in [8, 12, 16, 20]):
            return True
    return False


def check_question(lmList):
    # Check if the index finger is the highest point (lowest y-coordinate) and pointing upward
    if lmList[8][2] < lmList[6][2] and all(lmList[8][2] < lmList[i][2] for i in [4, 12, 16, 20]):
        # Ensure other fingers (including the thumb) are not pointing upward
        # Their tip y-coordinates should be greater than their proximal joint y-coordinates
        if all(lmList[i][2] > lmList[i-3][2] for i in [12, 16, 20]):
            return True
    return False


def check_note(lmList):
    # "OK" gesture
    # Tip of the thumb and index finger touching, others open
    if (lmList[6][2] < lmList[7][2] and lmList[6][2] < lmList[5][2] and
        lmList[12][2] < lmList[11][2] and lmList[12][2] < lmList[10][2] and
        lmList[16][2] < lmList[15][2] and lmList[16][2] < lmList[14][2] and
            lmList[20][2] < lmList[19][2] and lmList[20][2] < lmList[18][2]):
        return True
    return False


def check_capture(lmList):
    # Fist gesture
    if lmList[7][1] < lmList[4][1] < lmList[19][1] or lmList[19][1] < lmList[4][1] < lmList[7][1]:
        # Check if other fingers are curled (tip y-coordinate less than metacarpal base y-coordinate)
        if all(lmList[i][2] > lmList[i-3][2] for i in [8, 12, 16, 20]):
            return True
    return False


cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    img = detector.findHands(img, draw=True)
    lmList = detector.findPosition(img, draw=False)
    if len(lmList) != 0:
        if check_next(lmList):
            print("Next gesture detected")

        elif check_prev(lmList):
            print("Previous gesture detected")

        elif check_question(lmList):
            print("Question gesture detected")

        elif check_note(lmList):
            print("Note gesture detected")

        elif check_capture(lmList):
            print("Capture gesture detected")

        else:
            print(lmList)

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime

    cv2.imshow("Image", img)
    cv2.waitKey(1)
