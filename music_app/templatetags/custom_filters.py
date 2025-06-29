from django import template

register = template.Library()

@register.filter
def split_by_comma(value):
    return [s.strip() for s in value.split(',')]
