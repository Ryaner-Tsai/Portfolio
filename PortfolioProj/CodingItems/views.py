from django.shortcuts import render

# Create your views here.

def home(request):

    return render(request, 'CodingItems/home.html')

def snake(request):
    return render(request,'CodingItems/snake.html')

def getip(request):
    return render(request,'CodingItems/getip.html')
