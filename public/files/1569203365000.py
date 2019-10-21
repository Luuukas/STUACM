from espeak import espeak
import random
import time
ans = random.randint(0,100);
espeak.synth("Let's sing a song!")
print("Let's sing a song!")
time.sleep(2)
promt = "";
l = [
"A is for apple",
"B is for ball",
"C is for cat",
"D is for dog",
"E is for elephant",
"F is for fish",
"G is for gorilla",
"H is for hat",
"I is for igloo",
"J is for juice",
"K is for kangaroo",
"L is for lion",
"M is for monkey",
"N is for no",
"O is for octopus",
"P is for pig",
"Q is for question",
"R is for ring",
"S is for sun",
"T is for train",
"U is for umbrella",
"V is for van",
"W is for watch",
"X is for box",
"Y is for yellow",
"Z is for zoo"
]
while(1):
	promt = raw_input ("Please enter an alphabet: ")
	alpha = ord(promt)
	if(alpha<97 or alpha>112):
		espeak.synth("Oops")
		print("Oops")
		break;
	espeak.synth(l[alpha-97])
	print(l[alpha-97])
