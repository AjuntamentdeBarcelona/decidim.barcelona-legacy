# Store/Load a matrix composed of a hash of hashes into the redis database
class Recommendations::RedisMatrixStore
  def initialize(prefix)
    @prefix = prefix
    @redis = $redis
  end

  # Public
  #
  # Store each row as a hash which key is composed based on a prefix
  # and the row's key
  #
  # matrix - A hash where each key is a identifier and each value is
  #          another hash.
  def save(matrix)
    @redis.pipelined do
      matrix.each do |subject_id, preferences|
        preferences.each do |object_id, score|
          store_single_value(subject_id, object_id, score)
        end
      end
    end
  end

  # Public
  #
  # Load matrix from the redis store. It fetch each row using keys
  # lookup based on the initialized prefix
  def load
    keys = @redis.keys("#{@prefix}*") 

    rows = @redis.pipelined do
      keys.map { |key| @redis.hgetall(key) }
    end

    keys.each.with_index.inject({}) do |matrix, (key, index)|
      match_data = key.match(Regexp.new("#{@prefix}_\(\\d+\)"))
      if match_data
        matrix[match_data[1]] = rows[index].each do |k, v|
          rows[index][k] = v.to_i
        end
      end
      matrix
    end
  end

  # Public
  #
  # Update a single value of the redis store based on the subject and
  # object identifiers.
  #
  # subject_id - Subject's identifier
  # object_id  - Object's identifier
  # score      - Object's weight for that subject
  def store_single_value(subject_id, object_id, score)
    @redis.hset "#{@prefix}_#{subject_id}", object_id, score
  end
end
