from django.db import models

class CountdownTarget(models.Model):
	target = models.DateTimeField()
	name = models.CharField(max_length = 128)
	comment = models.CharField(max_length = 512, blank = True)
	def __unicode__(self):
		return "Target @ " + str(self.target) + "(" + self.name + ")"