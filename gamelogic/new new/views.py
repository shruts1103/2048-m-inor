from django.shortcuts import render

# Create your views here.
def basic(request):
    return render(request, 'basic.html')
def basic2(request):
    return render(request, 'basic2.html')
def index(request):
    return render(request, 'index.html')
def index2(request):
    return render(request, 'index2.html')

def fivebasic(request):
    return render(request, 'fivebasic.html')
def fivebasic2(request):
    return render(request, 'fivebasic2.html')
def fiveindex(request):
    return render(request, 'fiveindex.html')
def fiveindex2(request):
    return render(request, 'fiveindex2.html')




def base(request):
    return render(request, 'base.html')
def signup(request):
    return render(request, 'signup.html')
