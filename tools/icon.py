from PIL import Image,ImageDraw,ImageFont
import os
N=1024;im=Image.new('RGB',(N,N));d=ImageDraw.Draw(im)
for y in range(N):
    t=y/N;d.line([(0,y),(N,y)],fill=(int(30+60*t),int(80+20*t),int(220-40*t)))
for r,a in [(430,40),(330,40)]:
    ov=Image.new('RGBA',(N,N),(0,0,0,0));ImageDraw.Draw(ov).ellipse([N/2-r,N/2-r,N/2+r,N/2+r],fill=(255,255,255,a));im.paste(ov,(0,0),ov)
d=ImageDraw.Draw(im)
# Umhang
d.polygon([(250,330),(774,330),(900,820),(512,700),(124,820)],fill=(220,38,38))
d.polygon([(250,330),(774,330),(820,500),(204,500)],fill=(239,68,68))
# Buch
d.rounded_rectangle([200,420,512,760],30,fill=(255,255,255));d.rounded_rectangle([512,420,824,760],30,fill=(241,245,249))
d.line([(512,430),(512,750)],fill=(148,163,184),width=8)
for k in range(5):
    d.line([(235,500+k*45),(480,500+k*45)],fill=(203,213,225),width=10)
f=None
for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']:
    if os.path.exists(p): f=ImageFont.truetype(p,330);break
if f is None: f=ImageFont.load_default(330)
d.text((668,590),'5',font=f,fill=(37,99,235),anchor='mm')
# Held-Kopf mit Maske
d.ellipse([392,150,632,390],fill=(253,224,171))
d.rounded_rectangle([382,230,642,310],40,fill=(30,41,59))
d.ellipse([440,250,490,290],fill=(255,255,255));d.ellipse([534,250,584,290],fill=(255,255,255))
d.ellipse([456,262,478,284],fill=(30,41,59));d.ellipse([550,262,572,284],fill=(30,41,59))
d.arc([452,300,572,370],20,160,fill=(120,53,15),width=10)
# Stern
import math
cx,cy,R1,R2=800,240,90,38
pts=[(cx+(R1 if i%2==0 else R2)*math.cos(math.pi/5*i-math.pi/2),cy+(R1 if i%2==0 else R2)*math.sin(math.pi/5*i-math.pi/2)) for i in range(10)]
d.polygon(pts,fill=(250,204,21))
for n in (192,512):im.resize((n,n),Image.LANCZOS).save(f'icon-{n}.png')
print('icons ok')
