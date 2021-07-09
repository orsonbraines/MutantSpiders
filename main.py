import pygame as pg
import math

class Spider:
	def __init__(self):
		self.x = 100
		self.y = 100
		self.head_r = 10
		self.body_rx = 12
		self.body_ry = 20
		self.leg_angles = [
			[-70, -10, 10, 40, 125, 155, 185, 210],
			[-35, -5, 25, 50, 140, 170, 190, 250]
		]
		self.frame = 0
		for i in range(2):
			for j in range(8):
				self.leg_angles[i][j] = math.radians(self.leg_angles[i][j])
		self.leg_length = 40

	def draw(self, surface):
		self.draw_head(surface)
		#pg.draw.ellipse(surface, (0,0,0), (-12 + self.x, 3 + self.y, 24, 40))
		self.draw_body(surface)
		self.draw_legs(surface)

	def draw_head(self, surface):
		pg.draw.ellipse(surface, (0,0,0), (-self.head_r + self.x, -self.head_r + self.y, self.head_r * 2, self.head_r * 2))

	def draw_body(self, surface):
		pg.draw.ellipse(surface, (0,0,0), (-self.body_rx + self.x, self.head_r - 9 + self.y, self.body_rx * 2, self.body_ry * 2))

	def draw_legs(self, surface):
		for i in range(8):
			pg.draw.line(surface, (0,0,0), (self.x + self.head_r * math.cos(self.leg_angles[self.frame][i]), self.y + self.head_r * math.sin(self.leg_angles[self.frame][i])),
				(self.x + (self.head_r + self.leg_length) * math.cos(self.leg_angles[self.frame][i]), self.y + (self.head_r + self.leg_length) * math.sin(self.leg_angles[self.frame][i])), 2)

	def tick(self):
		self.frame = 1 - self.frame

def main():
	pg.init()
	pg.display.set_caption("Abnormal arachnid anihilation (Silky Spider Slaying) ((Mutant monster madness))")
	screen = pg.display.set_mode((640,480), 0, 24)
	screen.fill((255, 255, 255))
	spider = Spider()
	spider.draw(screen)
	pg.display.flip()

	pg.time.set_timer(pg.USEREVENT, 333)

	while 1:
		quitProgram = False
		for event in pg.event.get():
			if event.type == pg.QUIT:
				quitProgram = True
				break
			if event.type == pg.USEREVENT:
				spider.tick()
				screen.fill((255, 255, 255))
				spider.draw(screen)
				pg.display.flip()
		if quitProgram:
			 break

	pg.quit()

if __name__ == "__main__":
	main()
