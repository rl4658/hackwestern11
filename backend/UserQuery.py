class UserQuery:
    def __init__(self):
        # Initialize an empty list to store previous strings
        self.previous_strings = []
    
    def add_query(self, query: str):
        """
        Add a new query to the list of previous strings.
        
        :param query: The query string to add.
        """
        # Strip extra whitespace and append the query
        query = query.strip()
        self.previous_strings.append(query)
    
    def to_string(self) -> str:
        """
        Combine all previous strings into a syntactically coherent query.

        :return: A single formatted string representing all queries.
        """
        if not self.previous_strings:
            return ""
        
        # Merge queries into a logical context using conjunctions or transitions
        result = self.previous_strings[0]
        for query in self.previous_strings[1:]:
            if result[-1] in ".!?":  # Add space for new context if last query ends with punctuation
                result += " " + query
            else:  # Otherwise, create a continuation using appropriate conjunctions
                result += " and " + query
        
        return result


