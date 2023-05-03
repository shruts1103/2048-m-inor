from django.shortcuts import render

# Create your views here.
def basic(request):
    return render(request, 'basic.html')
def index(request):
    return render(request, 'index1.html')
def index2(request):
    return render(request, 'index2.html')
def base(request):
    return render(request, 'base.html')
def signup(request):
    return render(request, 'signup.html')
