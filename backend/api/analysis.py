import spacy
from collections import Counter
from markdown_it import MarkdownIt
from langdetect import detect

models = {
    'es': spacy.load("es_core_news_sm"),
    'en': spacy.load("es_core_news_sm"),
    'default': spacy.load("xx_sent_ud_sm")
}

def get_model(text):
    lang = detect(text)
    if lang in models:
        return models[lang]
    else:
        return modes['default']

def remove_text_markdown(text):
    """Remove the markdown marks form the text to allow the analysis """
    md = MarkdownIt("gfm-like")
    tokens = md.parse(text)
    result = []
    for t in tokens:
        if t.type.endswith('_close'):
            result.append("\n")
        if t.type == 'inline':
            for child in t.children:
                if child.type == 'text':
                    result.append(child.content.strip())
    return " ".join(result)


class TextAnalyzer:
    def __init__(self, text):
        self.text = remove_text_markdown(text)

    def get_tokens(self):
        if not hasattr(self, 'tokens'):
            nlp = get_model(self.text)
            doc = nlp(self.text)
            self.tokens = [ token for token in doc if token.is_alpha ]
        return self.tokens

    def count_words(self):
        return len(self.get_tokens())

    def frequencies(self):
        result = []
        tokens = self.get_tokens()
        words = [ token.lemma_ for token in tokens if not token.is_stop ]
        counter = Counter(words)

        for token in tokens:
            result.append({
                'text': token.text,
                'lemma': token.lemma_,
                'count': counter[token.lemma_]
            })
        return result


    def word_tags(self):
        result = []
        tokens = self.get_tokens()

        for token in tokens:
            result.append({
                'text': token.text,
                'pos': token.pos_,
            })


        return result
